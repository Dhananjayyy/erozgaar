using eRozgaarDotNet.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace eRozgaarDotNet.Services
{
    public class UserService
    {
        private readonly erozgaarContext _dbContext;

        public UserService(erozgaarContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task SaveUserWithVlc(User user, Vlc vlc)
        {
            using (var transaction = await _dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    // Save user
                    _dbContext.Users.Add(user);
                    await _dbContext.SaveChangesAsync();

                    // Assign UserId to Vlc and save Vlc
                    vlc.UserId = user.UserId;
                    _dbContext.Vlcs.Add(vlc);
                    await _dbContext.SaveChangesAsync();

                    // Commit the transaction
                    await transaction.CommitAsync();
                }
                catch (Exception)
                {
                    // Handle exception, optionally rollback transaction
                    await transaction.RollbackAsync();
                    throw;
                }
            }
        }
    }
}
