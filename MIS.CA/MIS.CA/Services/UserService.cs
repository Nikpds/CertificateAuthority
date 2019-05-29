using MIS.CA.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MIS.CA.Services
{
    public interface IUserService
    {
        bool Login(UserLoginView user);
    }

    public class UserService
    {

        public bool Login(UserLoginView user)
        {
            if (user.Password == "geakmh" && user.Username == "admin")
            {
                return true;
            }
            return false;
        }
    }
}
