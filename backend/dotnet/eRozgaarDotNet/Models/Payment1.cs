using System;
using System.Collections.Generic;

namespace eRozgaarDotNet.Models
{
    public partial class Payment1
    {
        public int PaymentId { get; set; }
        public decimal Amount { get; set; }
        public DateOnly PaymentDate { get; set; }
        public int JobAllocationId { get; set; }

        public virtual JobAllocation JobAllocation { get; set; } = null!;
    }
}
