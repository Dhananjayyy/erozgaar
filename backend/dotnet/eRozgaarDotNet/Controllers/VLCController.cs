using eRozgaarDotNet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eRozgaarDotNet.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class VLCController : ControllerBase
    {
        [HttpGet]
        public List<Vlc> showAllProviderToAdmin()
        {
            List<Vlc> vlcs = new List<Vlc>();
            using (var db = new erozgaarContext())
            {
                vlcs = db.Vlcs.ToList();
            }
            return vlcs;
        }
    }
}
