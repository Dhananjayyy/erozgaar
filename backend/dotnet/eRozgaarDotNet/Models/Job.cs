using System;
using System.Collections.Generic;

namespace eRozgaarDotNet.Models
{
    public partial class Job
    {
        public Job()
        {
            JobAllocations = new HashSet<JobAllocation>();
        }

        public int JobId { get; set; }
        public string JobTitle { get; set; } = null!;
        public string JobDescription { get; set; } = null!;
        public int JobCategoryId { get; set; }
        public int AddressId { get; set; }
        public int JobStatus { get; set; }
        public int NoOfWorkers { get; set; }
        public int ProviderId { get; set; }
        public DateOnly PostDate { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }

        public virtual Address Address { get; set; } = null!;
        public virtual JobCategory JobCategory { get; set; } = null!;
        public virtual Provider Provider { get; set; } = null!;
        public virtual ICollection<JobAllocation> JobAllocations { get; set; }
    }
}
