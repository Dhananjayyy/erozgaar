using System;
using System.Collections.Generic;

namespace eRozgaarDotNet.Models
{
    public partial class Provider
    {
        public Provider()
        {
            Jobs = new HashSet<Job>();
            Payments = new HashSet<Payment>();
        }

        public int ProviderId { get; set; }
        public string? FirstName { get; set; }
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string? OrganizationName { get; set; }
        public string Education { get; set; } = null!;
        public int AddressId { get; set; }
        public int UserId { get; set; }

        public virtual Address Address { get; set; } = null!;
        public virtual User User { get; set; } = null!;
        public virtual ICollection<Job> Jobs { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
