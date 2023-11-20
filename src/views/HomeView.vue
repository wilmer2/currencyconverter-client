<script setup lang="ts"></script>

<template>
	<div class="bg-white rounded-lg shadow-md p-6 mx-auto max-w-screen-lg mt-4">
		<div class="flex flex-col md:flex-row">
			<div class="w-full mr-2 mb-4">
				<label for="importe" class="block mb-1 font-semibold text-black"
					>Importe</label
				>
				<input
					type="text"
					id="importe"
					name="importe"
					class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div class="w-full mr-2 mb-4">
				<label for="de" class="block mb-1 font-semibold text-black">De:</label>
				<select
					id="de"
					name="de"
					class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="opcion1">Opción 1</option>
					<option value="opcion2">Opción 2</option>
				</select>
			</div>
			<div class="w-full">
				<label for="a" class="block mb-1 font-semibold text-black">a</label>
				<select
					id="a"
					name="a"
					class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="opcion1">Opción 1</option>
					<option value="opcion2">Opción 2</option>
				</select>
			</div>
		</div>
		<div class="mt-5 md:mt-1 mb-3">
			<h2 class="text-gray-500 font-semibold text-lg">
				20.000 USD = 22.0000 CAD
			</h2>
		</div>
		<div class="mt-4 md:mt-1">
			<button
				class="bg-blue-500 text-white px-4 py-2 flex items-center justify-between space-x-2 rounded-md"
			>
				<span>Cambio</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="none"
					stroke="currentColor"
				>
					<circle cx="10" cy="10" r="9" stroke-width="2" />
					<path stroke-width="2" d="M12 8l2 2-2 2M8 12l-2-2 2-2" />
				</svg>
			</button>
		</div>
	</div>
</template>
