using eRozgaarDotNet.Models;
using eRozgaarDotNet.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eRozgaarDotNet.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class VLCController : ControllerBase
    {
        
        [HttpGet]
        public List<Vlc> showAllVlcToAdmin()
        {
            List<Vlc> vlcs = new List<Vlc>();
            using (var db = new erozgaarContext())
            {
                vlcs = db.Vlcs.ToList();
            }
            return vlcs;

        }

        // save vlc
        [HttpPost]
        public async Task<IActionResult> SaveVlc([FromBody] Vlc vlc)
        {
            try
            {
                using (var db = new erozgaarContext())
                {
                    UserService userService = new UserService(db);
                    await userService.SaveUserWithVlc(vlc.User, vlc);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
