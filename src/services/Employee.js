import firebase from 'firebase';

export function signInWithEmailAndPassword(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => ({ user }))
    .catch(() => {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => ({ user }))
        .catch((err) => ({ err }));
    });
}

export function create({ name, phone, shift }) {
  const { currentUser } = firebase.auth();

  return firebase.database().ref(`/users/${currentUser.uid}/employees`)
    .push({ name, phone, shift })
    .then((user) => ({ user }))
    .catch((err) => ({ err }));
}

export function remove(uid) {
  const { currentUser } = firebase.auth();

  return firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
    .remove()
    .then((user) => ({ user }))
    .catch((err) => ({ err }));
}

export function update(uid, { name, phone, shift }) {
  const { currentUser } = firebase.auth();

  return firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
    .set({ name, phone, shift })
    .then((user) => ({ user }))
    .catch((err) => ({ err }));
}

export function doWatchList(callback) {
  const { currentUser } = firebase.auth();
  const ref = firebase.database().ref(`/users/${currentUser.uid}/employees`);

  const handler = (snapshot) => {
    callback(snapshot.val());
  };

  ref.on('value', handler);

  return () => {
    ref.off('value', handler);
  };
}
