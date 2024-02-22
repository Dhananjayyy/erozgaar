using System;
using System.Collections.Generic;

namespace eRozgaarDotNet.Models
{
    public partial class Admin
    {
        public int AdminId { get; set; }
        public string FirstName { get; set; } = null!;
        public string? MiddleName { get; set; }
        public string LastName { get; set; } = null!;
        public int UserId { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
