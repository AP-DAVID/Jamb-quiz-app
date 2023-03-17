const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const Head = require("../models/Head");
const Subject = require("../models/Subject");
const Question = require("../models/Question");
const { GraphQLDateTime, GraphQLObjectId } = require("graphql-scalars");

// Define SubjectType
const SubjectType = new GraphQLObjectType({
  name: "Subject",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    questions: {
      type: new GraphQLList(QuestionType),
      resolve(parent, args) {
        return Question.find({ _id: { $in: parent.questions } });
      },
    },
  }),
});

// Define QuestionType
const QuestionType = new GraphQLObjectType({
  name: "Question",
  fields: () => ({
    id: { type: GraphQLID },
    question: { type: GraphQLString },
    options: { type: new GraphQLList(GraphQLString) },
    answer: { type: GraphQLInt },
    subject: {
      type: SubjectType,
      resolve(parent, args) {
        return Subject.findById(parent.subject);
      },
    },
  }),
});

// Define HeadType
const HeadType = new GraphQLObjectType({
  name: "Head",
  fields: () => ({
    id: { type: GraphQLID },
    subjects: {
      type: new GraphQLList(SubjectType),
      resolve(parent, args) {
        return Subject.find({ _id: { $in: parent.subjects } });
      },
    },
  }),
});

// Define RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    subject: {
      type: SubjectType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return Subject.findOne({ id: args.id });
      },
    },
    question: {
      type: QuestionType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Question.findById(args.id);
      },
    },
    head: {
      type: HeadType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Head.findById(args.id);
      },
    },
  },
});

// Define Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addSubject: {
      type: SubjectType,
      args: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        questionIds: { type: new GraphQLList(GraphQLID) },
      },
      resolve(parent, args) {
        const subject = new Subject({
          id: args.id,
          name: args.name,
          questions: args.questionIds,
        });
        return subject.save();
      },
    },
    addQuestion: {
      type: QuestionType,
      args: {
        subjectId: { type: GraphQLID },
        question: { type: GraphQLString },
        options: { type: new GraphQLList(GraphQLString) },
        answer: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let question = new Question({
          question: args.question,
          options: args.options,
          answer: args.answer,
        });
        // Save the new question to the database
        question.save();

        // Find the subject with the specified ID and update its questions array
        return Subject.findByIdAndUpdate(
          args.subjectId,
          {
            $push: { questions: question._id },
          },
          { new: true }
        ).populate("questions");
      },
    },
    updateQuestionOptions: {
      type: QuestionType,
      args: {
        id: { type: GraphQLID },
        options: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parent, args) {
        return Question.findByIdAndUpdate(args.id, { options: args.options });
      },
    },

    deleteSubject: {
      type: SubjectType,
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return Subject.findOneAndDelete({ id: args.id });
      },
    },
    deleteQuestion: {
      type: QuestionType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Question.findByIdAndDelete(args.id);
      },
    },
    updateQuestion: {
      type: QuestionType,
      args: {
        id: { type: GraphQLID },
        question: { type: GraphQLString },
        answer: { type: GraphQLInt },
        options: { type: new GraphQLList(GraphQLString) },
        subjectId: { type: GraphQLID },
      },
      resolve(parent, args) {
        const updatedFields = {};
        if (args.question) {
          updatedFields.question = args.question;
        }
        if (args.answer) {
          updatedFields.answer = args.answer;
        }
        if (args.options) {
          updatedFields.options = args.options;
        }
        if (args.subjectId) {
          updatedFields.subject = args.subjectId;
        }
        return Question.findByIdAndUpdate(args.id, updatedFields, {
          new: true,
        });
      },
    },

    updateQuestionAnswer: {
      type: QuestionType,
      args: {
        id: { type: GraphQLID },
        answer: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return Question.findByIdAndUpdate(args.id, { answer: args.answer });
      },
    },
    updateSubject: {
      type: SubjectType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        questionIds: { type: new GraphQLList(GraphQLID) },
      },
      resolve(parent, args) {
        const updatedFields = {};
        if (args.name) {
          updatedFields.name = args.name;
        }
        if (args.questionIds) {
          updatedFields.questions = args.questionIds;
        }
        return Subject.findByIdAndUpdate(args.id, updatedFields, { new: true });
      },
    },
  },
});

// Define the GraphQL schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
