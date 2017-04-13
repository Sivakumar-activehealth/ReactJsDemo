using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReactJsNet.MVC5.Models
{
    public class SupplierModel
    {
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string MasterSupplier { get; set; }
        public string SupplierStatus { get; set; }
        public bool isSelected { get; set; }
    }
}