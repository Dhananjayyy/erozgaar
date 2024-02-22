using System;
using System.Collections.Generic;

namespace eRozgaarDotNet.Models
{
    public partial class Vlc
    {
        public Vlc()
        {
            Payments = new HashSet<Payment>();
        }

        public int VlcId { get; set; }
        public string FirstName { get; set; } = null!;
        public string? MiddleName { get; set; }
        public string LastName { get; set; } = null!;
        public string Education { get; set; } = null!;
        public int AddressId { get; set; }
        public int UserId { get; set; }

        public virtual Address Address { get; set; } = null!;
        public virtual User User { get; set; } = null!;
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
