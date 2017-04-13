using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ReactJsNet.MVC5.Models;

namespace ReactJsNet.MVC5.Controllers
{
    public class HomeController : Controller
    {

        public ActionResult Index()
        {
            return View();
        }


        public JsonResult GetFamilyData(string name, string sortColumnName = "SupplierName", string sortOrder = "asc", int pageSize = 3, int currentPage = 1)
        {
            List<FamilyModel> model = new List<FamilyModel>();
            int totalPage = 0;
            int totalRecord = 0;
            model.Add(new FamilyModel { Id = 1, Name = "aetna", Address = "chennai", Email = "kumar1@gmail.com", Mobile = "8894569785" });
            model.Add(new FamilyModel { Id = 2, Name = "test", Address = "chennai", Email = "kumar2@gmail.com", Mobile = "8894569785" });
            model.Add(new FamilyModel { Id = 3, Name = "test1", Address = "chennai", Email = "kumar3@gmail.com", Mobile = "8894569785" });
            model.Add(new FamilyModel { Id = 4, Name = "ahm aetna", Address = "chennai", Email = "kumar4@gmail.com", Mobile = "8894569785" });
            var result = model;
            if (!string.IsNullOrEmpty(name))
            {
                result= model.Where(c => c.Name == name).ToList();
            }
            totalRecord = result.Count();
            if (pageSize > 0)
            {
                totalPage = totalRecord / pageSize + ((totalRecord % pageSize) > 0 ? 1 : 0);
                result = result.OrderBy(x => sortColumnName).Skip(pageSize * (currentPage - 1)).Take(pageSize).ToList();
            }
            else
            {
                result = result.ToList();
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}