using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ReactJsNet.MVC5.Models;
namespace ReactJsNet.MVC5.Controllers
{
    public class SupplierController : Controller
    {
        // GET: Supplier
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetSupplierData(string name, string sortColumnName = "SupplierName", string sortOrder = "asc", int pageSize = 3, int currentPage = 1)
        {
            List<SupplierModel> model = new List<SupplierModel>();
            int totalPage = 0;
            int totalRecord = 0;
            model.Add(new SupplierModel {SupplierId=1,SupplierName="Aetna Test",MasterSupplier="Test",SupplierStatus="Production",isSelected=false });
            model.Add(new SupplierModel { SupplierId = 2, SupplierName = "Aetna Test", MasterSupplier = "Test1", SupplierStatus = "Production", isSelected = false });
            model.Add(new SupplierModel { SupplierId = 3, SupplierName = "Test1", MasterSupplier = "Test2", SupplierStatus = "Production", isSelected = false });
            model.Add(new SupplierModel { SupplierId = 4, SupplierName = "Syntal Test2", MasterSupplier = "Test3", SupplierStatus = "Production", isSelected = false });
            model.Add(new SupplierModel { SupplierId = 5, SupplierName = "Spark Test3", MasterSupplier = "Test4", SupplierStatus = "Production", isSelected = false });

            var result = model.ToList();
            if (!string.IsNullOrEmpty(name))
            {
                result = model.Where(c => c.SupplierName == name).ToList();
            }
            totalRecord = result.Count();
            if (pageSize > 0)
            {
                totalPage = totalRecord / pageSize + ((totalRecord % pageSize) > 0 ? 1 : 0);
                result = result.OrderBy(x=> sortColumnName).Skip(pageSize * (currentPage - 1)).Take(pageSize).ToList();
            }
            else
            {
                result = result.ToList();
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}