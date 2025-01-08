import { faker } from '@faker-js/faker';

// generate a valid real name
export function generateValidRealName(): string {
  let realName: string;

  do {
    realName = faker.person.fullName();

    // not exceed 20 characters
    if (realName.length > 20) {
      realName = realName.slice(0, 20);
    }
  } while (realName.length < 6 || !/^[0-9a-zA-Z ]*$/.test(realName));

  return realName;
}

// generate a valid displayname
export function generateName(): string {
  let displayName: string;

  do {
    displayName = faker.internet.displayName();
  } while (displayName.length < 6 || !/^[0-9a-zA-Z ]*$/.test(displayName));

  return displayName;
}

// generate a valid username
export function generateValidUsername(): string {
  let username: string;

  // Generate a unique alphanumeric username
  do {
    username = faker.internet.userName();
  } while (
    username.length < 8 ||
    !/^[a-zA-Z0-9]+$/.test(username) ||
    username.length > 20
  );

  // username is lowercase and within 20 characters
  const limitedUsername = username.toLowerCase().slice(0, 20);

  return limitedUsername;
}

// generate a valid email address
export function generateValidEmailAddress(): string {
  const generatedEmails: string[] = [];

  const domains: string[] = [
    'gmail.com',
    'googlemail.com',
    'example.com',
    'yourdomain.com',
    'testdomain.com',
    'testingdomain.com',
    'exampledomain.com',
    'ahooh.com',
    'testmail.com',
  ];

  const validChars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const emailLength = Math.floor(Math.random() * 8) + 8; // Random length between 8 and 15
  let email = '';

  for (let i = 0; i < emailLength; i++) {
    const randomIndex = Math.floor(Math.random() * validChars.length);
    email += validChars[randomIndex];
  }

  const selectedDomain = domains[Math.floor(Math.random() * domains.length)];
  email += `@${selectedDomain}`;

  // Check for duplicates and generate a new email if needed
  while (generatedEmails.includes(email)) {
    email = generateValidEmailAddress();
  }

  generatedEmails.push(email);

  return email;
}

export function generateRandomNum() {
  const ranNumber = faker.number.int({ min: 2, max: 20 });

  return ranNumber;
}

export function generateFakeCode() {
  const randomChars = faker.string.alphanumeric(4);
}
