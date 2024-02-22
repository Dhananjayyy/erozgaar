using eRozgaarDotNet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eRozgaarDotNet.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProviderController : ControllerBase
    {
        [HttpGet]
        public List<Provider> showAllProviderToAdmin()
        {
            List<Provider> providers = new List<Provider>();
            using (var db = new erozgaarContext())
            {
                providers = db.Providers.ToList();
            }
            return providers;
        }
    }
}
