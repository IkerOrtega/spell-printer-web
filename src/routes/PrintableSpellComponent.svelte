<script lang="ts">
	import { type Spell } from '$lib/Spell';
	import action1 from '$lib/assets/img/pf2e-action-1.png';
	import action2 from '$lib/assets/img/pf2e-action-2.png';
	import action3 from '$lib/assets/img/pf2e-action-3.png';
	import reaction from '$lib/assets/img/pf2e-reaction.png';
	import freeaction from '$lib/assets/img/pf2e-free-action.png';
	interface Props {
		spell: Spell;
		selected: boolean;
		onToggle: () => void;
	}

	let { spell, selected, onToggle }: Props = $props();

	function getActionImg(actionType: string): string {
		let imgPath = '';
		 switch (actionType) {
			 case 'one-action':
				 imgPath = action1;
				 break;
			 case 'two-actions':
				 imgPath = action2;
				 break;
			 case 'three-actions':
				 imgPath = action3;
				 break;
			 case 'reaction':
				 imgPath = reaction;
				 break;
			 case 'free-action':
				 imgPath = freeaction;
				 break;

		 }

		 return imgPath;
	}
</script>
<li class="card cardBlock" class:selected onclick={onToggle}>
		<div class="front">
			<div class="body">
				<h3 class="name lined srname">{spell.title} <img src="{getActionImg(spell.actionType)}" alt="{spell.actionType}"/></h3>
				<ul class="status lined">
					<li><em>Lanzamiento</em>{spell.castTime ? spell.castTime : '-'}</li>
					<li class="second"><em>Rango</em>{spell.range}</li>
					<br clear="all">
				</ul>

				<ul class="status lined">
					<li><em>Área</em>{spell.area}</li>
					<li class="second"><em>Duración</em>{spell.duration}</li>
					<br clear="all">
				</ul>

				<ul class="status lined">
					<li><em>Objetivo</em>{spell.objectives}</li>
					<li class="second"><em>Desencadenate</em>{spell.trigger}</li>
					<br clear="all">
				</ul>
				<p class="text">{spell.description}<br> <b>Elevaciones</b>: {spell.heightenings} </p>

			</div>
			<b class="class srclass">{spell.traditions}</b>
			<b class="type srtype">{spell.type} {spell.level}</b>
		</div>
</li>

<style>
	.selected {
		border-color: black !important;
		background: black !important;
	}
		.card {
			float: left;
			display: table;

			@media screen {
				width: 33%;

			}
			@media print {
				break-inside: avoid-page;
				width: 33%;
			}

			height: 3.5in;
			background: gray;
			font-size: 10px;
			position: relative;
			vertical-align: top;
			text-align: left;
			z-index: 1;
			margin: 1vw 1px 1px 0;

			.front {
				height: 100%;
				width: 100%;
				padding: 10px 10px 25px;
				box-sizing: border-box;
				-moz-box-sizing: border-box;
				-webkit-box-sizing: border-box;
				position: absolute;
				top: 0;
				left: 0;

				.body {
					background-color: #fff !important;
					border-radius: 5px;
					height: 100%;
					overflow: hidden;
				}

			}
			* {
				color: black !important;
				font-size: 10px;
			}

			.lined {
				border-bottom: 2px solid gray;
			}
			.name {
				vertical-align: middle;
				display: inline-block;
				font-size: 14px;
				line-height: normal;
				padding: 6px 5px;
				margin: 0;
				text-transform: uppercase;
				text-align: center;
				min-height: 20px;
				width: 100%;

				img {
					vertical-align: middle;
					width: 1rem;
					margin: auto;
				}
			}
			.status {
				list-style: none;
				text-align: center;
				padding: 0;
				margin: 0;

				li {
					padding: 2px 4px;
					float: left;
					vertical-align: top;
					font-size: 9px;
					line-height: 9px;
					min-height: 25px;
					width: 50%;
					margin: 0;
					box-sizing: border-box;
					-moz-box-sizing: border-box;

					em {
						font-style: normal;
						text-transform: uppercase;
						display: block;
						color: maroon !important;
						font-weight: bold;
						padding-bottom: 2px;
					}

				}

				li.second {
					border-left: 2px solid maroon;
				}
			}

			.text {
				padding: 2px 4px;
				font-size: 10px;
				line-height: 9px;
				margin: 0;
			}
			.class {
				position: absolute;
				bottom: 8px;
				color: #fff !important;
				left: 10px;
				font-size: 9px;
				font-weight: normal;
			}

			.type {
				position: absolute;
				bottom: 8px;
				color: #fff !important;
				right: 10px;
				font-size: 10px;
				font-weight: normal;
			}
		}


</style>
