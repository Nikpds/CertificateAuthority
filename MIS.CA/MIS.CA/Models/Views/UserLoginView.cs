using System.ComponentModel.DataAnnotations;

namespace MIS.CA.Models.Views
{
    public class UserLoginView
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
