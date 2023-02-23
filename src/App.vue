<template>
	<main>
		<!-- Header-->
		<header>
			<img src="" alt="logo" />
			<h1> Pinia Tasks </h1>
		</header>
		<!--Task Add form-->
		<div class="new-task-form">
			<Form @submit.prevent="handleSubmit">
				<input type="text" placeholder="Add task..." v-model="newTask" />

				<button> Add </button>
			</Form>
		</div>

		<div class="loading" v-if="taskStore.isLoading"> Loading Task... </div>

		<!--filter nav-->
		<nav class="filter">
			<button @click="filter = 'all'">All Task </button>
			<button @click="filter = 'Favs'"> Fav Task</button>
		</nav>
		<!-- Task List-->
		<div class="task-list" v-if="filter === 'all'">
			<p>All Task {{ taskStore.totalCount }} in TODO</p>
			<div v-for="task in taskStore.tasks">
				<div class="task"
					><h3>
						{{ task.title }}
					</h3>
					<div class="icons">
						<i class="material-icons" @click="taskStore.deleteTask(task.id)"
							>delete
						</i>
						<i
							class="material-icons"
							:class="{ active: task.isFav }"
							@click="taskStore.toggleFav(task.id)"
						>
							favorite
						</i>
					</div>
				</div>
			</div>
		</div>
		<!--for fav -->
		<div class="task-list" v-if="filter === 'Favs'">
			<p>Fav Task {{ taskStore.favsCount }} in TODO</p>
			<div v-for="task in taskStore.Favs">
				<div class="task"
					><h3>
						{{ task.title }}
					</h3>
					<div class="icons">
						<i class="material-icons" @click="taskStore.deleteTask(task.id)"
							>delete
						</i>
						<i
							class="material-icons"
							:class="{ active: task.isFav }"
							@click="taskStore.toggleFav(task.id)"
						>
							favorite
						</i>
					</div>
				</div>
			</div>
		</div>
		<button @click="taskStore.$reset"> Reset State </button>
	</main>
</template>

<script>
//import { TaskDetails } from "./components/TaskDetails.vue";
import { useTaskStore } from "./stores/TaskStore";
import { ref } from "vue";

export default {
	//	components: { TaskDetails },
	setup() {
		const taskStore = useTaskStore();
		//fetch task

		taskStore.getTasks();
		const filter = ref("all");
		const newTask = ref("");
		const handleSubmit = () => {
			if (newTask.value.length > 0) {
				taskStore.addTask({
					title: newTask.value,
					inFav: false,
					id: Math.floor(Math.random() * 10000),
				});
				newTask.value = "";
			}
		};
		return { taskStore, filter, newTask, handleSubmit };
	},
};
</script>
