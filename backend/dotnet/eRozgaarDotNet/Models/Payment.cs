using System;
using System.Collections.Generic;

namespace eRozgaarDotNet.Models
{
    public partial class Payment
    {
        public int PaymentId { get; set; }
        public string PaymentMode { get; set; } = null!;
        public int Amount { get; set; }
        public int TransactionId { get; set; }
        public int? ProviderId { get; set; }
        public int? VlcId { get; set; }

        public virtual Provider? Provider { get; set; }
        public virtual Vlc? Vlc { get; set; }
    }
}
