const Participant = require('../models/participant');
const Poll = require('../models/poll');
const {
  CreatePostObject
} = require('../utils')

exports.Get_Participants = (req, res) => {
  let pollId = '';
  Poll
    .findOne({
      slug: req.params.slug
    })
    .exec()
    .then((poll) => {
      if (poll.length < 1)
        res.status(204).json({
          message: "anket bulunamadı"
        })
    })
    .then(() => {
      Participant.find({
          pollId
        })
        .exec()
        .then((participants) => {
          if (participants.length > 0) {
            res.status(200).json({
              participants,
            });
          } else {
            res.status(204).json({
              pollId,
              participants: [],
              message: 'katılımcı bulunamadı...',
            });
          }
        })
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
};

exports.Post_Participant = (req, res) => {
  const participant = new Participant(CreatePostObject(req.body));
  participant
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Kaydınız alınmıştır...',
      });
    })
    .then(() => {
      Poll.findOne({
          _id: req.body.pollId
        })
        .exec()
        .then((poll) => {
          const pAnswers = req.body.answers;
          const {
            answers,
            questions
          } = poll;
          for (let i = 0; i < pAnswers.length; i += 1) {
            for (let k = 0; k < answers.length; k += 1) {
              if (pAnswers[i].questionOrder === answers[k].questionOrder) {
                if (pAnswers[i].order === answers[k].order) {
                  answers[k].count += 1;
                }
              }
            }
            questions[i].count += 1;
          }
          return {
            answers,
            questions
          };
        })
        .then(({
          answers,
          questions
        }) => {
          Poll.update({
            _id: req.body.pollId
          }, {
            $set: {
              answers,
              questions,
            },
          }).exec();
        });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
};