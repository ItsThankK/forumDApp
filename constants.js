export const contractAddress = "0x1b00d74ccafa90c0e6e5665f728d68e181ad4cf1"
export const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "addComment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getComments",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "creator_address",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "message",
						"type": "string"
					}
				],
				"internalType": "struct Comments.Comment[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]