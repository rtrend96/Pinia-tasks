import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
	state: () => ({
		tasks: [
			// made json data to get data
			// {
			// 	id: 1,
			// 	title: "Get some water",
			// 	isFav: false,
			// },
			// {
			// 	id: 2,
			// 	title: "Do coding",
			// 	isFav: true,
			// },
		],
		isLoading: false,
		//name: "Rushikesh Nage",
	}),
	getters: {
		Favs() {
			return this.tasks.filter((t) => t.isFav);
		},
		favsCount() {
			return this.tasks.reduce((p, c) => {
				return c.isFav ? p + 1 : p;
			}, 0);
		},
		totalCount: (state) => {
			return state.tasks.length;
		},
	},
	actions: {
		async getTasks() {
			this.isLoading = true;

			const res = await fetch("http://localhost:3000/tasks");
			const data = await res.json();
			this.tasks = data;
			this.isLoading = false;
		},
		async addTask(task) {
			this.tasks.push(task);
			const res = await fetch("http://localhost:3000/tasks", {
				method: "post",
				body: JSON.stringify(task),
				headers: { "content-Type": "application/json" },
			});
		},
		async deleteTask(id) {
			this.tasks = this.tasks.filter((t) => {
				return t.id !== id;
			});
			const res = await fetch("http://localhost:3000/tasks/" + id, {
				method: "delete",
			});
		},
		async toggleFav(id) {
			const task = this.tasks.find((t) => t.id == id);
			task.isFav = !task.isFav;
			const res = await fetch("http://localhost:3000/tasks/" + id, {
				method: "patch",
				body: JSON.stringify({ isFav: task.isFav }),
				headers: { "content-Type": "application/json" },
			});
		},
	},
});
