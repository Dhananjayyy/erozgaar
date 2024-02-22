using System;
using System.Collections.Generic;

namespace eRozgaarDotNet.Models
{
    public partial class City
    {
        public City()
        {
            Addresses = new HashSet<Address>();
        }

        public int CityId { get; set; }
        public string CityName { get; set; } = null!;
        public int StateId { get; set; }

        public virtual State State { get; set; } = null!;
        public virtual ICollection<Address> Addresses { get; set; }
    }
}
