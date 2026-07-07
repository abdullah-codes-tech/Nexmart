using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder(CreateOrderDto dto)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        int userId = userIdClaim != null ? int.Parse(userIdClaim.Value) : 1;

        var order = new Order
        {
            UserId = userId,
            TotalAmount = dto.TotalAmount,
            ShippingAddress = dto.ShippingAddress,
            Phone = dto.Phone,
            Items = dto.Items.Select(i => new OrderItem
            {
                ProductId = i.ProductId,
                Quantity = i.Quantity,
                Price = i.Price
            }).ToList()
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Order placed successfully", orderId = order.Id });
    }

   [HttpGet]
public async Task<IActionResult> GetAllOrders()
{
    var orders = await _context.Orders
        .Include(o => o.Items)
        .OrderByDescending(o => o.CreatedAt)
        .ToListAsync();
    return Ok(orders);
}

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null) return NotFound();
        order.Status = status;
        await _context.SaveChangesAsync();
        return Ok(order);
    }
    [HttpGet("myorders")]
public async Task<IActionResult> GetMyOrders()
{
    var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
    if (userIdClaim == null) return Unauthorized();
    
    int userId = int.Parse(userIdClaim.Value);
    
    var orders = await _context.Orders
        .Where(o => o.UserId == userId)
        .Include(o => o.Items)
        .ThenInclude(i => i.Product)
        .OrderByDescending(o => o.CreatedAt)
        .ToListAsync();
        
    return Ok(orders);
}
}