using System.Collections.Generic;
using eRozgaarDotNet.Models;  // Assuming Worker class is in this namespace
using Microsoft.AspNetCore.Mvc;

namespace eRozgaarDotNet.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WorkerController : ControllerBase
    {
        [HttpGet]
        public List<Worker> ShowAllWorkerToAdmin()
        {
            List<Worker> workers = new List<Worker>();
            using (var db = new erozgaarContext())
            {
                workers = db.Workers.ToList();
            }
            return workers;
        }

        [HttpPut]
        public ActionResult UpdateWorker(Worker worker)
        {
            using (var db = new erozgaarContext())
            {
                db.Workers.Update(worker);
                db.SaveChanges();
            }
            return Ok();
        }
    }
}
