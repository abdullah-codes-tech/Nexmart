using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContactController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> SendMessage(ContactMessage message)
    {
        _context.ContactMessages.Add(message);
        await _context.SaveChangesAsync();
        return Ok("Message sent successfully");
    }

    [HttpGet]
    public async Task<IActionResult> GetMessages()
    {
        var messages = await _context.ContactMessages
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();
        return Ok(messages);
    }

    [HttpPut("{id}/read")]
    public async Task<IActionResult> MarkAsRead(int id)
    {
        var message = await _context.ContactMessages.FindAsync(id);
        if (message == null) return NotFound();
        message.IsRead = true;
        await _context.SaveChangesAsync();
        return Ok(message);
    }
}