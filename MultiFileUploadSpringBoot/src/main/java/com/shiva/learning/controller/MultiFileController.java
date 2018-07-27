package com.shiva.learning.controller;

import java.util.Enumeration;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.support.DefaultMultipartHttpServletRequest;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
public class MultiFileController {
	
	
	
	 	@RequestMapping("/")
	    public String index() {
	        return "Welcome to Boot!";
	    }
	 	
	 	@PostMapping("uploadFiles")
	 	public String uploadMultiFiles(HttpServletRequest request)
	 	{
	 		System.out.println("hitted uploadFiles");
	 		Enumeration e =request.getParameterNames();
	 		while(e.hasMoreElements())
	 		{
	 			System.out.println(e.nextElement());
	 		}
	 		
	 		
	 		MultipartHttpServletRequest multiPartRequest = new DefaultMultipartHttpServletRequest(request);
			try {
				multiPartRequest = (MultipartHttpServletRequest) request;
				multiPartRequest.getParameterMap();
				//multipartRequest.
				Iterator < String > it = multiPartRequest.getFileNames();

				int i = 1;

				while (it.hasNext()) {
					MultipartFile multipart = multiPartRequest.getFile(it.next());
					System.out.println("File name is "+multipart.getOriginalFilename());
				}
			}catch(Exception ex) {
				

			}
	 		return "uploaded ";
	 	}
	 

}
