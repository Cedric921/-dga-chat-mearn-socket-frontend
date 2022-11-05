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
