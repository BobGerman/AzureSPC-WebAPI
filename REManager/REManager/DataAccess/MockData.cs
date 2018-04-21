using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using REManager.Models;

namespace REManager
{
    public class MockData
    {
        private REProperty[] mock = new REProperty[]
        {
            new REProperty {
                Id = 1,
                Name = "Beautiful bungalow",
                Address = "5 Wayside Road",
                Unit = "",
                City = "Burlington",
                State = "MA",
                PostalCode = "01803",
                PurchaseDate = new DateTime(2010, 12, 3),
                PurchaseAmount = 344000
            },
            new REProperty {
                Id = 2,
                Name = "Downtown luxury",
                Address = "280 Trumbull St.",
                Unit = "21st floor",
                City = "Hartford",
                State = "CT",
                PostalCode = "06103",
                PurchaseDate = new DateTime(2016, 4, 1),
                PurchaseAmount = 350000
            },
            new REProperty {
                Id = 3,
                Name = "Cute condominium",
                Address = "1245 Worcester Rd.",
                Unit = "3072",
                City = "Natick",
                State = "MA",
                PostalCode = "01760",
                PurchaseDate = new DateTime(2014, 8, 15),
                PurchaseAmount = 235000
            },
            new REProperty {
                Id = 4,
                Name = "Shopper's paradise",
                Address = "75 Middlesex Turnpike",
                Unit = "M300",
                City = "Burlington",
                State = "MA",
                PostalCode = "01803",
                PurchaseDate = new DateTime(2016, 11, 22),
                PurchaseAmount = 198500
            },
            new REProperty {
                Id = 5,
                Name = "City Condo",
                Address = "97 Providence Place",
                Unit = "5505",
                City = "Providence",
                State = "RI",
                PostalCode = "02903",
                PurchaseDate = new DateTime(2015, 5, 25),
                PurchaseAmount = 278455
            }
        };

        public REProperty[] getAllProperties()
        {
            return this.mock;
        }

        public REProperty getProperty(int Id)
        {
            return this.mock.Where(x => { return x.Id == Id; }).FirstOrDefault();
        }
    }
}
