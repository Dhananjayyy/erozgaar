using System;
using System.Collections.Generic;

namespace eRozgaarDotNet.Models
{
    public partial class Worker
    {
        public Worker()
        {
            JobAllocations = new HashSet<JobAllocation>();
            Address = new Address();
        }

        public int WorkerId { get; set; }
        public string FirstName { get; set; } = null!;
        public string? MiddleName { get; set; }
        public string LastName { get; set; } = null!;
        public string Education { get; set; } = null!;
        public int AddressId { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public bool Relocation { get; set; }
        public bool? Available { get; set; }
        public int JobCategoryId { get; set; }
        public int UserId { get; set; }

        public virtual Address Address { get; set; }
        public virtual JobCategory JobCategory { get; set; } = null!;
        public virtual User User { get; set; } = null!;
        public virtual ICollection<JobAllocation> JobAllocations { get; set; }
    }
}
