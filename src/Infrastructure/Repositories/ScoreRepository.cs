using Domain.Models;
using Infrastructure.DbContexts;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

public class ScoreRepository {
    private readonly MainDbContext _dbContext;

    public ScoreRepository(
        MainDbContext dbContext
    ) {
        _dbContext = dbContext;
    }

    public async Task<bool> AddScoreHistory(ScoreHistory scoreHistory) {
        await _dbContext.ScoreHistoryDbSet.AddAsync(scoreHistory);
        return (await _dbContext.SaveChangesAsync()) > 0;
    }
}
