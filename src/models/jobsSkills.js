'use strict';
const Sequelize = require('sequelize')
const Model = Sequelize.Model
const Op = Sequelize.Op

class JobSkill extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'O jobId deve ser informado.'
          },
          async isInJobs(value) {
            try {
              const job = await this.sequelize.models.Job.get(value)
              if(!job) {
                throw new Error('Job associado não pode ser encontrado')
              }
            } catch (error) {
              throw error;
            }
          }
        },
      },
      skillId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'O skillId deve ser informado.'
          },
          async isInUsers(value) {
            try {
              const skill = await this.sequelize.model.Skill.get(value)
              if(!skill) {
                throw new Error('Skill associado não pode ser encontrado')
              }
            } catch(error) {
              throw error;
            }
          }
        },
      },
    }, {
      tableName: 'jobs_skills',
      sequelize,
      underscored: true
    })
  }

  static associate(models) {
    this.belongsTo(models.Job, {
      foreignKey: 'job_id',
      targetKey: 'id',
      as: 'Jobs'
    }),
    this.belongsTo(models.Skill, {
      foreignKey: 'skill_id',
      targetKey: 'id',
      as: 'Skill'
    })
  }
}

module.exports = JobSkill