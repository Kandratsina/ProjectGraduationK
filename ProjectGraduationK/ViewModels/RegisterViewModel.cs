using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ProjectGraduationK.ViewModels
{
    public class RegisterViewModel
    {
        [Required]
        //[DisplayName("Email")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [DisplayName("Пароль")]
        public string Password { get; set; }


        [Required]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Пароли не совпадают")]
        [DisplayName("Подтвердите пароль")]
        public string PasswordConfirm { get; set; } 
    }
}