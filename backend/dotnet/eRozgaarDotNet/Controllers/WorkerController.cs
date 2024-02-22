using eRozgaarDotNet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eRozgaarDotNet.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WorkerController : ControllerBase
    {
        [HttpGet]
        public List<Worker> showAllWorkerToAdmin()
        {
            List<Worker> workers = new List<Worker>();
            using (var db = new erozgaarContext())
            {
                workers = db.Workers.ToList();
            }
            return workers;
        }
    }
}
