{{define "menu"}}
	<div class="ui fixed inverted top menu">
		<div class="container">
			<a href="/" class="item">Solve Sudoku</a>
			<a href="/recent" class="item">Recently Solved</a>
			<div class="ui dropdown item">
				Like or Share <i class="icon dropdown"></i>
				<div class="menu">
					<div class="item">
						<span class="st_facebook_large" displayText="Facebook"></span>
						<span class="st_twitter_large" displayText="Tweet"></span>
						<span class="st_googleplus_large" displayText="Google +"></span>
						<span class="st_vkontakte_large" displayText="Vkontakte"></span>
					</div>
				</div>
	      	</div>
			<a href="/rules" class="item right floated">
				<i class="question icon"></i>
				Sudoku Rules
		    </a>
		</div>
	</div>
{{end}}