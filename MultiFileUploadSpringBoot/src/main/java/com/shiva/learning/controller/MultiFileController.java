package com.shiva.learning.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import org.json.JSONObject;
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
	 		System.out.println("hitting uploadFiles");
	 		//System.out.println("data is "+ upladeedFiles);
	 		
	 		
	 		List documentList= new ArrayList<>();
			

	 		//System.out.println(request.getParameter("fileInfo"));
	 		
			JSONArray jsonArray = new JSONArray(request.getParameter("fileInfo"));
			
			 for (int i = 0; i < jsonArray.length(); i++)
		        {
		            JSONObject jsonObj = jsonArray.getJSONObject(i);
		            documentList.add(jsonObj);

		            System.out.println("index "+ i +" --  "+jsonObj);
		        }
			 	
				 		
		        
	 		
	 		MultipartHttpServletRequest multiPartRequest = new DefaultMultipartHttpServletRequest(request);

			try {

				multiPartRequest = (MultipartHttpServletRequest) request;
				multiPartRequest.getParameterMap();

				Iterator<String> itr = multiPartRequest.getFileNames();
				while (itr.hasNext()) {

					MultipartFile mFile = multiPartRequest.getFile(itr.next());

 
					System.out.println("FileName is "+mFile.getOriginalFilename());
					
					// Do something with the mfile based on your requirement
				
				
				
				}

			} catch (Exception e) {
				e.printStackTrace();
			}

			return "uploaded ";
	 	}
	 

}
