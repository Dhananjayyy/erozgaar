using System;
using System.Collections.Generic;

namespace eRozgaarDotNet.Models
{
    public partial class SecurityQuestion
    {
        public SecurityQuestion()
        {
            Users = new HashSet<User>();
        }

        public int SecurityQuestionId { get; set; }
        public string? Question { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
