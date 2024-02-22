using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace eRozgaarDotNet.Models
{
    public partial class erozgaarContext : DbContext
    {
        public erozgaarContext()
        {
        }

        public erozgaarContext(DbContextOptions<erozgaarContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Addresses { get; set; } = null!;
        public virtual DbSet<Admin> Admins { get; set; } = null!;
        public virtual DbSet<City> Cities { get; set; } = null!;
        public virtual DbSet<Doctor> Doctors { get; set; } = null!;
        public virtual DbSet<Job> Jobs { get; set; } = null!;
        public virtual DbSet<JobAllocation> JobAllocations { get; set; } = null!;
        public virtual DbSet<JobCategory> JobCategories { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Payment1> Payments1 { get; set; } = null!;
        public virtual DbSet<Provider> Providers { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<SecurityQuestion> SecurityQuestions { get; set; } = null!;
        public virtual DbSet<Specialization> Specializations { get; set; } = null!;
        public virtual DbSet<State> States { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<Vlc> Vlcs { get; set; } = null!;
        public virtual DbSet<Worker> Workers { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=erozgaar", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.31-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Address>(entity =>
            {
                entity.ToTable("addresses");

                entity.HasIndex(e => e.CityId, "fk_address_city");

                entity.Property(e => e.AddressId).HasColumnName("address_id");

                entity.Property(e => e.AddressLine1)
                    .HasMaxLength(100)
                    .HasColumnName("address_line_1");

                entity.Property(e => e.AddressLine2)
                    .HasMaxLength(100)
                    .HasColumnName("address_line_2");

                entity.Property(e => e.CityId).HasColumnName("city_id");

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.CityId)
                    .HasConstraintName("fk_address_city");
            });

            modelBuilder.Entity<Admin>(entity =>
            {
                entity.ToTable("admins");

                entity.HasIndex(e => e.UserId, "fk_admin_user");

                entity.Property(e => e.AdminId).HasColumnName("admin_id");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .HasColumnName("first_name");

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .HasColumnName("last_name");

                entity.Property(e => e.MiddleName)
                    .HasMaxLength(50)
                    .HasColumnName("middle_name");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Admins)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("fk_admin_user");
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.ToTable("cities");

                entity.HasIndex(e => e.StateId, "fk_city_state");

                entity.Property(e => e.CityId).HasColumnName("city_id");

                entity.Property(e => e.CityName)
                    .HasMaxLength(50)
                    .HasColumnName("city_name");

                entity.Property(e => e.StateId).HasColumnName("state_id");

                entity.HasOne(d => d.State)
                    .WithMany(p => p.Cities)
                    .HasForeignKey(d => d.StateId)
                    .HasConstraintName("fk_city_state");
            });

            modelBuilder.Entity<Doctor>(entity =>
            {
                entity.ToTable("doctors");

                entity.HasIndex(e => e.LoginId, "UK_d3oqr8slkk4vb9t3n8sobi603")
                    .IsUnique();

                entity.Property(e => e.DoctorId).HasColumnName("doctor_id");

                entity.Property(e => e.Contact)
                    .HasMaxLength(255)
                    .HasColumnName("contact");

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .HasColumnName("email");

                entity.Property(e => e.Experience).HasColumnName("experience");

                entity.Property(e => e.Fname)
                    .HasMaxLength(255)
                    .HasColumnName("fname");

                entity.Property(e => e.Lname)
                    .HasMaxLength(255)
                    .HasColumnName("lname");

                entity.Property(e => e.LoginId).HasColumnName("login_id");

                entity.Property(e => e.Mname)
                    .HasMaxLength(255)
                    .HasColumnName("mname");

                entity.Property(e => e.Picture)
                    .HasMaxLength(255)
                    .HasColumnName("picture");

                entity.Property(e => e.Specialization)
                    .HasMaxLength(255)
                    .HasColumnName("specialization");

                entity.HasOne(d => d.Login)
                    .WithOne(p => p.Doctor)
                    .HasForeignKey<Doctor>(d => d.LoginId)
                    .HasConstraintName("FKr60echdoev5ioy08p075cotlk");
            });

            modelBuilder.Entity<Job>(entity =>
            {
                entity.ToTable("jobs");

                entity.HasIndex(e => e.AddressId, "fk_job_address");

                entity.HasIndex(e => e.JobCategoryId, "fk_job_category");

                entity.HasIndex(e => e.ProviderId, "fk_job_provider");

                entity.Property(e => e.JobId).HasColumnName("job_id");

                entity.Property(e => e.AddressId).HasColumnName("address_id");

                entity.Property(e => e.EndDate).HasColumnName("end_date");

                entity.Property(e => e.JobCategoryId).HasColumnName("job_category_id");

                entity.Property(e => e.JobDescription)
                    .HasMaxLength(255)
                    .HasColumnName("job_description");

                entity.Property(e => e.JobStatus)
                    .HasColumnName("job_status")
                    .HasDefaultValueSql("'1'");

                entity.Property(e => e.JobTitle)
                    .HasMaxLength(50)
                    .HasColumnName("job_title");

                entity.Property(e => e.NoOfWorkers).HasColumnName("no_of_workers");

                entity.Property(e => e.PostDate).HasColumnName("post_date");

                entity.Property(e => e.ProviderId).HasColumnName("provider_id");

                entity.Property(e => e.StartDate).HasColumnName("start_date");

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Jobs)
                    .HasForeignKey(d => d.AddressId)
                    .HasConstraintName("fk_job_address");

                entity.HasOne(d => d.JobCategory)
                    .WithMany(p => p.Jobs)
                    .HasForeignKey(d => d.JobCategoryId)
                    .HasConstraintName("fk_job_category");

                entity.HasOne(d => d.Provider)
                    .WithMany(p => p.Jobs)
                    .HasForeignKey(d => d.ProviderId)
                    .HasConstraintName("fk_job_provider");
            });

            modelBuilder.Entity<JobAllocation>(entity =>
            {
                entity.ToTable("job_allocation");

                entity.HasIndex(e => e.JobId, "fk_joballocation_job");

                entity.HasIndex(e => e.WorkerId, "fk_joballocation_worker");

                entity.Property(e => e.JobAllocationId).HasColumnName("job_allocation_id");

                entity.Property(e => e.JobId).HasColumnName("job_id");

                entity.Property(e => e.Status).HasColumnName("status");

                entity.Property(e => e.WorkerId).HasColumnName("worker_id");

                entity.HasOne(d => d.Job)
                    .WithMany(p => p.JobAllocations)
                    .HasForeignKey(d => d.JobId)
                    .HasConstraintName("fk_joballocation_job");

                entity.HasOne(d => d.Worker)
                    .WithMany(p => p.JobAllocations)
                    .HasForeignKey(d => d.WorkerId)
                    .HasConstraintName("fk_joballocation_worker");
            });

            modelBuilder.Entity<JobCategory>(entity =>
            {
                entity.ToTable("job_category");

                entity.Property(e => e.JobCategoryId).HasColumnName("job_category_id");

                entity.Property(e => e.CategoryName)
                    .HasMaxLength(50)
                    .HasColumnName("category_name");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.ToTable("payment");

                entity.HasIndex(e => e.ProviderId, "fk_providerid_idx");

                entity.HasIndex(e => e.VlcId, "fk_vlcid_idx");

                entity.Property(e => e.PaymentId).HasColumnName("payment_id");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.PaymentMode)
                    .HasMaxLength(15)
                    .HasColumnName("payment_mode")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.ProviderId).HasColumnName("provider_id");

                entity.Property(e => e.TransactionId).HasColumnName("transaction_id");

                entity.Property(e => e.VlcId).HasColumnName("vlc_id");

                entity.HasOne(d => d.Provider)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.ProviderId)
                    .HasConstraintName("fk_providerid");

                entity.HasOne(d => d.Vlc)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.VlcId)
                    .HasConstraintName("fk_vlcid");
            });

            modelBuilder.Entity<Payment1>(entity =>
            {
                entity.HasKey(e => e.PaymentId)
                    .HasName("PRIMARY");

                entity.ToTable("payments");

                entity.HasIndex(e => e.JobAllocationId, "fk_payment_joballocation");

                entity.Property(e => e.PaymentId).HasColumnName("payment_id");

                entity.Property(e => e.Amount)
                    .HasPrecision(10, 2)
                    .HasColumnName("amount");

                entity.Property(e => e.JobAllocationId).HasColumnName("job_allocation_id");

                entity.Property(e => e.PaymentDate).HasColumnName("payment_date");

                entity.HasOne(d => d.JobAllocation)
                    .WithMany(p => p.Payment1s)
                    .HasForeignKey(d => d.JobAllocationId)
                    .HasConstraintName("fk_payment_joballocation");
            });

            modelBuilder.Entity<Provider>(entity =>
            {
                entity.ToTable("providers");

                entity.HasIndex(e => e.AddressId, "fk_provider_address");

                entity.HasIndex(e => e.UserId, "fk_provider_user");

                entity.Property(e => e.ProviderId).HasColumnName("provider_id");

                entity.Property(e => e.AddressId).HasColumnName("address_id");

                entity.Property(e => e.Education)
                    .HasMaxLength(50)
                    .HasColumnName("education");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .HasColumnName("first_name");

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .HasColumnName("last_name");

                entity.Property(e => e.MiddleName)
                    .HasMaxLength(50)
                    .HasColumnName("middle_name");

                entity.Property(e => e.OrganizationName)
                    .HasMaxLength(50)
                    .HasColumnName("organization_name");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Providers)
                    .HasForeignKey(d => d.AddressId)
                    .HasConstraintName("fk_provider_address");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Providers)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("fk_provider_user");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("roles");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.RoleName)
                    .HasMaxLength(50)
                    .HasColumnName("role_name");
            });

            modelBuilder.Entity<SecurityQuestion>(entity =>
            {
                entity.ToTable("security_questions");

                entity.Property(e => e.SecurityQuestionId).HasColumnName("security_question_id");

                entity.Property(e => e.Question)
                    .HasMaxLength(100)
                    .HasColumnName("question");
            });

            modelBuilder.Entity<Specialization>(entity =>
            {
                entity.HasKey(e => e.SpId)
                    .HasName("PRIMARY");

                entity.ToTable("specialization");

                entity.Property(e => e.SpId).HasColumnName("sp_id");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Specialization1)
                    .HasMaxLength(255)
                    .HasColumnName("specialization");
            });

            modelBuilder.Entity<State>(entity =>
            {
                entity.ToTable("states");

                entity.Property(e => e.StateId).HasColumnName("state_id");

                entity.Property(e => e.StateName)
                    .HasMaxLength(50)
                    .HasColumnName("state_name");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.AccountNumber, "account_number")
                    .IsUnique();

                entity.HasIndex(e => e.Adhaar, "adhaar")
                    .IsUnique();

                entity.HasIndex(e => e.RoleId, "fk_user_role");

                entity.HasIndex(e => e.SecurityQuestionId, "fk_user_securityquestion");

                entity.HasIndex(e => e.PhoneNumber, "phone_number")
                    .IsUnique();

                entity.HasIndex(e => e.UserName, "user_name")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.AccountNumber)
                    .HasMaxLength(20)
                    .HasColumnName("account_number");

                entity.Property(e => e.Active).HasColumnName("active");

                entity.Property(e => e.Adhaar)
                    .HasMaxLength(12)
                    .HasColumnName("adhaar");

                entity.Property(e => e.Answer)
                    .HasMaxLength(50)
                    .HasColumnName("answer");

                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .HasColumnName("gender");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(15)
                    .HasColumnName("phone_number");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.SecurityQuestionId).HasColumnName("security_question_id");

                entity.Property(e => e.UserName)
                    .HasMaxLength(50)
                    .HasColumnName("user_name");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("fk_user_role");

                entity.HasOne(d => d.SecurityQuestion)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.SecurityQuestionId)
                    .HasConstraintName("fk_user_securityquestion");
            });

            modelBuilder.Entity<Vlc>(entity =>
            {
                entity.ToTable("vlc");

                entity.HasIndex(e => e.AddressId, "fk_vlc_address");

                entity.HasIndex(e => e.UserId, "fk_vlc_user");

                entity.Property(e => e.VlcId).HasColumnName("vlc_id");

                entity.Property(e => e.AddressId).HasColumnName("address_id");

                entity.Property(e => e.Education)
                    .HasMaxLength(50)
                    .HasColumnName("education");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .HasColumnName("first_name");

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .HasColumnName("last_name");

                entity.Property(e => e.MiddleName)
                    .HasMaxLength(50)
                    .HasColumnName("middle_name");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Vlcs)
                    .HasForeignKey(d => d.AddressId)
                    .HasConstraintName("fk_vlc_address");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Vlcs)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("fk_vlc_user");
            });

            modelBuilder.Entity<Worker>(entity =>
            {
                entity.ToTable("workers");

                entity.HasIndex(e => e.AddressId, "fk_worker_address");

                entity.HasIndex(e => e.JobCategoryId, "fk_worker_jobcategory");

                entity.HasIndex(e => e.UserId, "fk_worker_user");

                entity.Property(e => e.WorkerId).HasColumnName("worker_id");

                entity.Property(e => e.AddressId).HasColumnName("address_id");

                entity.Property(e => e.Available)
                    .IsRequired()
                    .HasColumnName("available")
                    .HasDefaultValueSql("'1'");

                entity.Property(e => e.DateOfBirth).HasColumnName("date_of_birth");

                entity.Property(e => e.Education)
                    .HasMaxLength(50)
                    .HasColumnName("education");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .HasColumnName("first_name");

                entity.Property(e => e.JobCategoryId).HasColumnName("job_category_id");

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .HasColumnName("last_name");

                entity.Property(e => e.MiddleName)
                    .HasMaxLength(50)
                    .HasColumnName("middle_name");

                entity.Property(e => e.Relocation).HasColumnName("relocation");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.Workers)
                    .HasForeignKey(d => d.AddressId)
                    .HasConstraintName("fk_worker_address");

                entity.HasOne(d => d.JobCategory)
                    .WithMany(p => p.Workers)
                    .HasForeignKey(d => d.JobCategoryId)
                    .HasConstraintName("fk_worker_jobcategory");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Workers)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("fk_worker_user");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
