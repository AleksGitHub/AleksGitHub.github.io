<?php
    /**
    Plugin Name: Создание тестов
    Description: Плагин для создания тестов на сайте.
    Author: Penguin
    Version:
    */

function add_my_plugin_to_menu(){
    add_menu_page("test", "PinguinTest", "manage_options","pingun_test_plugin/test.php");
}
add_action('admin_menu','add_my_plugin_to_menu');

function add_my_css(){
    wp_enqueue_style('tests', plugins_url('pingun_test_plugin/tests.css'));
}
add_action('admin_enqueue_scripts', 'add_my_css');
function add_my_front_script(){
	
	wp_enqueue_script('jQuery', plugins_url('pingun_test_plugin/jquery.js' ));

	wp_enqueue_script('testScript', plugins_url('pingun_test_plugin/check.js' ));
	
	wp_localize_script('testScript', 'myajax', 
		array(
			'ajaxurl' => admin_url('admin-ajax.php')
		)
	);
}
add_action('wp_enqueue_scripts', 'add_my_front_script');

function add_my_scripts(){
    wp_enqueue_script('jQuery', plugins_url('pingun_test_plugin/jquery.js' ));
    wp_enqueue_script('testScript', plugins_url('pingun_test_plugin/tests.js' ));

}
add_action('admin_enqueue_scripts', 'add_my_scripts');
add_action('wp_ajax_action', 'my_action_func');
add_action('wp_ajax_check', 'check_answer');

function check_answer(){
	$answers =  $_POST['answers'];
	$name = $_POST['name'];
	$test = get_test_with_bd($name);
	$rightAnswer = json_decode(stripslashes($test['rightAnswer']), true);
	$ra = 0; //счетчик правильных ответов!
	// var_dump ($test['rightAnswer']);
	// var_dump($rightAnswer);
	// var_dump($answers);
	if (count($answers) == count($rightAnswer)){
		for ($i = 0; $i < count($answers); $i++){
			$check = ($answers['q'.$i] == $rightAnswer['q'.$i]);
			if($check){
				$ra ++;
			}
		} 
		echo 'вы ответили правильно на ' . $ra . ' вопросов ';
	}else{
		echo 'Ответили не на все вопросы';
	}
	
}

function my_action_func(){
	create_table();
	$data = $_POST['data'];
	$content = $_POST['content'];
	$name = $_POST['name'];
	$rightAnswer = $_POST['rightAnswer'];
	add_to_bd($data, $content, $name, $rightAnswer);
	create_new_post($name, $content);
	
}
function add_to_bd($data, $content, $name, $rightAnswer){
	global $wpdb;
	
	$wpdb -> insert(
		'wp_testpinguin',
		array(
		'name' => $name,
		'content' => $content,
		'data' => $data,
		'rightAnswer' => $rightAnswer
		)
	);
}
function get_test_with_bd($name){
	global $wpdb;
	$test =	$wpdb -> get_row("SELECT * FROM wp_testpinguin WHERE name = '{$name}'", ARRAY_A);
	return $test;

}

function create_new_post( $title, $content ){
	$postData = array(
	  'id'			  => 139,
	  'post_title'    => $title,
	  'post_content'  => $content,
	  'post_status'   => 'publish',
	  'post_author'   => 1,
	  'post_category' => array('')
	);
	$post_id = wp_insert_post($postData);
}

function create_table() {
	global $wpdb; 
	require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
	$tableName = $wpdb->get_blog_prefix() . 'testpinguin';
	$charset_collate = "DEFAULT CHARACTER SET {$wpdb->charset} COLLATE {$wpdb->collate}";
	$sql = "CREATE TABLE {$tableName} (
	id  bigint(20) unsigned NOT NULL auto_increment,
	name varchar(255) NOT NULL default '',
	content longtext NOT NULL default '',
	data longtext NOT NULL default '',
	rightAnswer longtext NOT NULL default '',
	PRIMARY KEY  (id),
	KEY alert (name)
	)
	{$charset_collate};
	";
	dbDelta($sql);
}