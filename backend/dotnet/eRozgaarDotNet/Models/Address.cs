using System;
using System.Collections.Generic;

namespace eRozgaarDotNet.Models
{
    public partial class Address
    {
        public Address()
        {
            Jobs = new HashSet<Job>();
            Providers = new HashSet<Provider>();
            Vlcs = new HashSet<Vlc>();
            Workers = new HashSet<Worker>();
        }

        public int AddressId { get; set; }
        public string AddressLine1 { get; set; } = null!;
        public string AddressLine2 { get; set; } = null!;
        public int CityId { get; set; }

        public virtual City City { get; set; } = null!;
        public virtual ICollection<Job> Jobs { get; set; }
        public virtual ICollection<Provider> Providers { get; set; }
        public virtual ICollection<Vlc> Vlcs { get; set; }
        public virtual ICollection<Worker> Workers { get; set; }
    }
}
