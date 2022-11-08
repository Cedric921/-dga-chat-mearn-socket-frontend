export interface iUser {
	_id: string;
	name: string;
	lastname: string;
	token: string;
}

export interface iUserLoginInput {
	username: string;
	password: string;
}

export interface iUserSignupInput {
	name: string;
	lastname: string;
	email: string;
	password: string;
	username: string;
}

export interface iUsersIDMessage {
	sender?: string;
	receiver: string;
}
