using System;
using System.Collections.Generic;

namespace eRozgaarDotNet.Models
{
    public partial class User
    {
        public User()
        {
            Admins = new HashSet<Admin>();
            Providers = new HashSet<Provider>();
            Vlcs = new HashSet<Vlc>();
            Workers = new HashSet<Worker>();
        }

        public int UserId { get; set; }
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public int RoleId { get; set; }
        public bool Active { get; set; }
        public string Adhaar { get; set; } = null!;
        public string AccountNumber { get; set; } = null!;
        public int SecurityQuestionId { get; set; }
        public string Answer { get; set; } = null!;

        public virtual Role Role { get; set; } = null!;
        public virtual SecurityQuestion SecurityQuestion { get; set; } = null!;
        public virtual Doctor? Doctor { get; set; }
        public virtual ICollection<Admin> Admins { get; set; }
        public virtual ICollection<Provider> Providers { get; set; }
        public virtual ICollection<Vlc> Vlcs { get; set; }
        public virtual ICollection<Worker> Workers { get; set; }
    }
}
