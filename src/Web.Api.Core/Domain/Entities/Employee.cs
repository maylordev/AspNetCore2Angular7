using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Web.Api.Core.Domain.Enums;
using Web.Api.Core.Shared;

namespace Web.Api.Core.Domain.Entities
{
    public class Employee : BaseEntity
    {
        [Required]
        [Display(Name = "First Name")]
        [StringLength(70, ErrorMessage = "First name cannot be longer than 70 characters.")]
        public string FirstName { get; set; }
        [Required]
        [Display(Name = "Last Name")]
        [StringLength(70, ErrorMessage = "Last name cannot be longer than 70 characters.")]
        public string LastName { get; set; }
        // public EmployeeType EmployeeType { get; set; }
        [Display(Name = "Full Name")]
        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }
        public Guid EmployerId { get; set; }

        internal Employee() { /* Required by EF */ }

        public Employee(string firstName, string lastName)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            // this.EmployeeType = employeeType;
            this.Created = DateTime.UtcNow;
        }
    }
}