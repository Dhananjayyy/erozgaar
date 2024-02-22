using eRozgaarDotNet.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace eRozgaarDotNet.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        [HttpGet]
        public List<Job> showAllJobToAdmin()
        {
            List<Job> jobs = new List<Job>();   
            using(var db =new erozgaarContext())
            {
                jobs= db.Jobs.ToList();
            }
            return jobs;
        }
    }
}
