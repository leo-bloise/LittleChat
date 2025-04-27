import { ReactNode } from "react";

export abstract class FactoryMessageComponent {
    abstract createComponent(message: {
        username: string;
        message: string;
    }): ReactNode;
    static getFactory(message: {
        username: string;
        message: string;
    }, currentUser: string) {
        if (message.username !== currentUser) {
            return new FactoryFriendMessageComponent();
        }
        return new FactoryMineMessageComponent();
    }
}

export class FactoryFriendMessageComponent extends FactoryMessageComponent {
    createComponent({ username, message }: {
        username: string;
        message: string;
    }): ReactNode {
        const randomString = Math.random().toString(36).substring(2, 10);
        return <div key={randomString} className="flex flex-col p-4 bg-gray-100 w-100 rounded-lg mt-4 mb-4">
            <span className="text-green-600">
                {username}
            </span>
            <span>
                {message}
            </span>
        </div>
    }
}

export class FactoryMineMessageComponent extends FactoryMessageComponent {
    createComponent({ username, message }: { username: string; message: string; }): ReactNode {
        const randomString = Math.random().toString(36).substring(2, 10);
        return <div key={randomString} className="grid grid-cols-2">
            <div style={{
                justifySelf: 'right'
            }} className="flex flex-col p-4 bg-gray-100 w-100 rounded-lg mt-4 mb-4, mr-4 col-start-2">
                <span className="text-red-400">
                    {username}
                </span>
                <span>
                    {message}
                </span>
            </div>
        </div>
    }
}