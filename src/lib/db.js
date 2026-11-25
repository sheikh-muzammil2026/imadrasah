import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client;
if (!global._mongoClientNextInstance) {
  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  });
  global._mongoClientNextInstance = client;
} else {
  client = global._mongoClientNextInstance;
}

const db = client.db("imadrasah");

export function getTeacherApplicationsCollection() {
  return db.collection("teacher_applications");
}

export function getCourseEnrollmentsCollection() {
  return db.collection("course_enrollments");
}

export function getUsersCollection() {
  return db.collection("user");
}

/**
 * Generate sequential unique Teacher ID starting from "0203"
 */
export async function generateNextTeacherId() {
  const usersCollection = getUsersCollection();
  const applicationsCollection = getTeacherApplicationsCollection();

  const [usersWithTid, appsWithTid] = await Promise.all([
    usersCollection
      .find({ teacherId: { $exists: true, $ne: null } }, { projection: { teacherId: 1 } })
      .toArray()
      .catch(() => []),
    applicationsCollection
      .find({ teacherId: { $exists: true, $ne: null } }, { projection: { teacherId: 1 } })
      .toArray()
      .catch(() => []),
  ]);

  let maxSequence = 2; // Baseline before 03 is 2

  const allTeacherIds = [...usersWithTid, ...appsWithTid].map((doc) =>
    String(doc.teacherId || "").trim()
  );

  for (const tid of allTeacherIds) {
    if (tid.startsWith("02")) {
      const suffix = tid.slice(2);
      const parsedNum = parseInt(suffix, 10);
      if (!isNaN(parsedNum) && parsedNum > maxSequence) {
        maxSequence = parsedNum;
      }
    }
  }

  const nextSeq = maxSequence + 1;
  const formattedSuffix = nextSeq < 10 ? `0${nextSeq}` : `${nextSeq}`;
  return `02${formattedSuffix}`;
}

/**
 * Generate sequential unique Student ID starting from "0401"
 */
export async function generateNextStudentId() {
  const usersCollection = getUsersCollection();
  const enrollmentsCollection = getCourseEnrollmentsCollection();

  const [usersWithSid, enrollmentsWithSid] = await Promise.all([
    usersCollection
      .find({ studentId: { $exists: true, $ne: null } }, { projection: { studentId: 1 } })
      .toArray()
      .catch(() => []),
    enrollmentsCollection
      .find({ studentId: { $exists: true, $ne: null } }, { projection: { studentId: 1 } })
      .toArray()
      .catch(() => []),
  ]);

  let maxSequence = 0; // Baseline before 01 is 0

  const allStudentIds = [...usersWithSid, ...enrollmentsWithSid].map((doc) =>
    String(doc.studentId || "").trim()
  );

  for (const sid of allStudentIds) {
    if (sid.startsWith("04")) {
      const suffix = sid.slice(2);
      const parsedNum = parseInt(suffix, 10);
      if (!isNaN(parsedNum) && parsedNum > maxSequence) {
        maxSequence = parsedNum;
      }
    }
  }

  const nextSeq = maxSequence + 1;
  const formattedSuffix = nextSeq < 10 ? `0${nextSeq}` : `${nextSeq}`;
  return `04${formattedSuffix}`;
}
