using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace REManager.Models
{
    public class REProperty
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Unit { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public DateTime PurchaseDate { get; set; }
        public int? PurchaseAmount { get; set; }
        public bool IsForSale { get; set; }
        public bool IsForRent { get; set; }
    }
}
