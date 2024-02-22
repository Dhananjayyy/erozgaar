using System;
using System.Collections.Generic;

namespace eRozgaarDotNet.Models
{
    public partial class JobAllocation
    {
        public JobAllocation()
        {
            Payment1s = new HashSet<Payment1>();
        }

        public int JobAllocationId { get; set; }
        public int JobId { get; set; }
        public int WorkerId { get; set; }
        public int Status { get; set; }

        public virtual Job Job { get; set; } = null!;
        public virtual Worker Worker { get; set; } = null!;
        public virtual ICollection<Payment1> Payment1s { get; set; }
    }
}
