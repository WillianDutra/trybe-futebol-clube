'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      homeTeamId: {
        type: Sequelize.INTEGER,
        field: 'home_team_id',
        allowNull: false,
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'home_team_goals',
        allowNull: false,
      },
      awaitTeamId: {
        type: Sequelize.INTEGER,
        field: 'away_team_id',
        allowNull: false,
      },
      awaitTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'away_team_goals',
        allowNull: false,
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        field: 'in_progress',
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
