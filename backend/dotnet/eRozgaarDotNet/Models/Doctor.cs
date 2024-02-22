using System;
using System.Collections.Generic;

namespace eRozgaarDotNet.Models
{
    public partial class Doctor
    {
        public int DoctorId { get; set; }
        public string? Contact { get; set; }
        public string? Email { get; set; }
        public float Experience { get; set; }
        public string? Fname { get; set; }
        public string? Lname { get; set; }
        public string? Mname { get; set; }
        public byte[]? Picture { get; set; }
        public string? Specialization { get; set; }
        public int? LoginId { get; set; }

        public virtual User? Login { get; set; }
    }
}
