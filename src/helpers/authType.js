import userTypeNames from "./authTypeNames";
export const authorType = function(accountTypeId, userTypeId, roleId = null) {
  // contractor
  if (userTypeId === "436b77d6-bc46-4527-bc72-ec7fc595e16d") {
    if (accountTypeId === "d23f2c1e-1ed3-4066-96d6-66a970e39a7f") {
      if (roleId === "4940d4e9-8bfd-467d-a9d9-20f719cdff93") {
        return userTypeNames.contractor_company_employee;
      } else {
        return userTypeNames.contractor_company_admin;
      }
    } else return userTypeNames.contractor_individual;

    // buyer
  } else if (userTypeId === "4dbe2854-fee8-4466-a9f0-aacf394a5b7e") {
    if (accountTypeId === "d23f2c1e-1ed3-4066-96d6-66a970e39a7f") {
      if (roleId === "4940d4e9-8bfd-467d-a9d9-20f719cdff93") {
        return userTypeNames.buyer_company_employee;
      } else {
        return userTypeNames.buyer_company_admin;
      }
    } else {
      return userTypeNames.buyer_individual;
    }
  } else if (userTypeId === "2a9e1d5f-722e-404e-8041-a6a665149e03") {
    if (accountTypeId === "d23f2c1e-1ed3-4066-96d6-66a970e39a7f") {
      if (roleId === "4940d4e9-8bfd-467d-a9d9-20f719cdff93") {
        return userTypeNames.supplier_company_employee;
      } else {
        return userTypeNames.supplier_company_admin;
      }
    }
  }
};

// let typesEnum = {
// 	Individual: "436b77d6-bc46-4527-bc72-ec7fc595e16d",
// 	Company: "d23f2c1e-1ed3-4066-96d6-66a970e39a7f",
// 	Contractor: "fcb9fde8-4ae5-4f6c-88e2-62e412847b2e",
// 	Supplier: "2a9e1d5f-722e-404e-8041-a6a665149e03",
// 	Buyer: "4dbe2854-fee8-4466-a9f0-aacf394a5b7e",
//  Admin:"274c0b77-90cf-4ee3-976e-01e409413057",
//  Employee:"4940d4e9-8bfd-467d-a9d9-20f719cdff93"
// };
