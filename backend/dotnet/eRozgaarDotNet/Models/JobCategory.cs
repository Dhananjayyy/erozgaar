using System;
using System.Collections.Generic;

namespace eRozgaarDotNet.Models
{
    public partial class JobCategory
    {
        public JobCategory()
        {
            Jobs = new HashSet<Job>();
            Workers = new HashSet<Worker>();
        }

        public int JobCategoryId { get; set; }
        public string? CategoryName { get; set; }

        public virtual ICollection<Job> Jobs { get; set; }
        public virtual ICollection<Worker> Workers { get; set; }
    }
}
